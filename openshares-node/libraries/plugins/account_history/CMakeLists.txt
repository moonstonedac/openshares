file(GLOB HEADERS "include/capricorn/account_history/*.hpp")

add_library( capricorn_account_history 
             account_history_plugin.cpp
           )

target_link_libraries( capricorn_account_history capricorn_chain capricorn_app )
target_include_directories( capricorn_account_history
                            PUBLIC "${CMAKE_CURRENT_SOURCE_DIR}/include" )

if(MSVC)
  set_source_files_properties( account_history_plugin.cpp PROPERTIES COMPILE_FLAGS "/bigobj" )
endif(MSVC)

install( TARGETS
   capricorn_account_history

   RUNTIME DESTINATION bin
   LIBRARY DESTINATION lib
   ARCHIVE DESTINATION lib
)
INSTALL( FILES ${HEADERS} DESTINATION "include/capricorn/account_history" )


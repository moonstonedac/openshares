file(GLOB HEADERS "include/capricorn/debug_delegate/*.hpp")

add_library( capricorn_debug_delegate
             debug_api.cpp
             debug_delegate.cpp
           )

target_link_libraries( capricorn_debug_delegate capricorn_chain capricorn_app )
target_include_directories( capricorn_debug_delegate
                            PUBLIC "${CMAKE_CURRENT_SOURCE_DIR}/include" )

install( TARGETS
   capricorn_debug_delegate

   RUNTIME DESTINATION bin
   LIBRARY DESTINATION lib
   ARCHIVE DESTINATION lib
)
